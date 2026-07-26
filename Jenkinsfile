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
	
//	stage('Owasp Dependency Check '){
//		steps{
//			dependencyCheck additionalArguments: '--scan .',
//				odcInstallation: 'Dependency-Check'
//		}
//
//	}

//	stage('Publish Dependency Check Report'){
//		steps{
//			dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
//		}
//	}

	stage('Push Docker Images') {
	    steps {
        	script {
            		withCredentials([usernamePassword(
                		credentialsId: 'dockerhub',
                		usernameVariable: 'DOCKER_USER',
                		passwordVariable: 'DOCKER_PASS')]) 
	    {

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
