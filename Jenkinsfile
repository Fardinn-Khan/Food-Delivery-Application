pipeline {
    agent any

    tools {
        jdk 'JDK21'
        maven 'Maven3'
        nodejs 'Node22'
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
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/desibites-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
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

        stage('Scan Backend Image') {
            steps {
                sh '''
                trivy image \
                --severity HIGH,CRITICAL \
                --format table \
                desibites-backend:latest
                '''
            }
        }

        stage('Scan Frontend Image') {
            steps {
                sh '''
                trivy image \
                --severity HIGH,CRITICAL \
                --format table \
                desibites-frontend:latest
                '''
            }
        }
	
	stage('Owasp Dependency Check '){
		steps{
			dependencyCheck addtionalArguments: '--scan .',
				odcInstallation: 'DependencyCheck'
		}

	}

	stage('Publish Dependency Check Report'){
		steps{
			dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
		}
	}

    }

    post {
        always {
            cleanWs()
        }

        success {
            echo 'Pipeline Completed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}
