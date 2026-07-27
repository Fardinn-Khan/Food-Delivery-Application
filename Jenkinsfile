pipeline {
    agent any

    tools {
        jdk 'JDK21'
        maven 'Maven3'
        nodejs 'Node22'
    }

    environment {
        SCANNER_HOME = tool 'SonarQubeScanner'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                    chmod +x mvnw
                    ./mvnw clean package -DskipTests
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                    ${SCANNER_HOME}/bin/sonar-scanner \
                    -Dsonar.projectKey=DesiBites \
                    -Dsonar.projectName=DesiBites \
                    -Dsonar.sources=. \
                    -Dsonar.java.binaries=backend/target
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/desibites-frontend') {
                    sh '''
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t desibites-backend:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend/desibites-frontend') {
                    sh 'docker build -t desibites-frontend:latest .'
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                mkdir -p reports

                echo "Scanning Backend Image..."

                trivy image \
                --severity HIGH,CRITICAL \
                --format table \
                desibites-backend:latest \
                > reports/backend-trivy-report.txt

                echo "Scanning Frontend Image..."

                trivy image \
                --severity HIGH,CRITICAL \
                --format table \
                desibites-frontend:latest \
                > reports/frontend-trivy-report.txt
                '''
            }
        }

        stage('Archive Trivy Reports') {
            steps {
                archiveArtifacts artifacts: 'reports/*.txt', fingerprint: true
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck(
                    odcInstallation: 'Dependency-Check',
                    additionalArguments: '--scan .'
                )
            }
        }

        stage('Publish Dependency Check Report') {
            steps {
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                    docker tag desibites-backend:latest fardinwork/desibites-backend:${BUILD_NUMBER}
                    docker tag desibites-backend:latest fardinwork/desibites-backend:latest

                    docker tag desibites-frontend:latest fardinwork/desibites-frontend:${BUILD_NUMBER}
                    docker tag desibites-frontend:latest fardinwork/desibites-frontend:latest

                    docker push fardinwork/desibites-backend:${BUILD_NUMBER}
                    docker push fardinwork/desibites-backend:latest

                    docker push fardinwork/desibites-frontend:${BUILD_NUMBER}
                    docker push fardinwork/desibites-frontend:latest

                    docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/

                kubectl rollout restart deployment/backend -n desibites
                kubectl rollout restart deployment/frontend -n desibites

                kubectl rollout status deployment/backend -n desibites
                kubectl rollout status deployment/frontend -n desibites
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl get pods -n desibites
                kubectl get svc -n desibites
                kubectl get ingress -n desibites
                '''
            }
        }

    }

    post {

        always {
            archiveArtifacts artifacts: 'reports/*.txt', allowEmptyArchive: true
            cleanWs()
        }

        success {
            echo 'Pipeline Completed Successfully.'
        }

        failure {
            echo 'Pipeline Failed.'
        }
    }
}
