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
                echo 'Checking out source code...'
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
        	    sh '''docker build -t desibites-backend:latest .'''
        	}
	    }
	}

	stage('Build Frontend Docker Image') {
 	   steps {
        	dir('frontend/desibites-frontend') {
            		sh '''docker build -t desibites-frontend:latest .'''
        	}
    	    }
	}

    }


    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {
            cleanWs()
        }
    }
}
