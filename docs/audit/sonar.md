# Starting SonarQube on local

Run `docker run -d --name SonarQube -p 9005:9000 -p 9092:9092 sonarqube`

# Generating reports

Run `npm run sonar`

# Accessing reports

At the time of the configuration, the reports can be accessed at: http://localhost:9005/dashboard?id=loyaltyPlus once the  `npm command` has been successfully executed

# Updating Quality Gates at local

- Login with admin/admin (this will grant access as admin)
- Open the report and navigate to Quality Gate
- Click on Create and add the rules
