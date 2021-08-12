# [Monitoring Network System](http://dte-network.surge.sh/)

[[Set up Zabbix server]](src/documents/SetUpZabbix.md)

[[Set up Zabbix notifcations via email]](src/documents/SetUpAlert.md)

> Dashboard made with Material-UI components and React.

![preview](public/static/preview.png)

# Introduction

## Introduction topic

- Web-based allow users to monitor network system via Zabbix server.

## Technology

- Programming language: HTML, CSS, Javascript
- Server: Zabbix
- Database: MySQL (in Zabbix)
- Library:
  - Axios: Promise based HTTP client for the browser and node.js.
  - Material UI: Build awesome Web UI quickly and easily.
  - Zabbix RPC.

# Main Functions

## Register new user

- Just enter the necessary information such as name, email, password to be able to register a new account.

![Register new user](public/static/register.png)

## Reset your password

- The user can retrieve the forgotten password via the previously registered email.

![Reset password](public/static/forgotpass.png)

- Change password successfully and user login again.

![Login](public/static/login.png)

- Host information

## Enter the IP Address

- Enter the IP Address and press GET button.

![IP Address](public/static/ipadd.png)

- Host information

![Dashboard](public/static/dashboard.png)

- Notifications

![Dashboard](public/static/notify.png)

- Click ![Button](public/static/button.png) to choose the host server.

![Choose Host](public/static/choose.png)

- Item information

![Item Information](public/static/item.png)

- Chart Information

![Chart Information](public/static/chart.png)

## References

- https://www.zabbix.com/documentation/5.0/manual/api
- https://github.com/axios/axios
- https://github.com/FaCuZ/zabbix-rpc#readme
- https://blog.zabbix.com/zabbix-api-explained/9155/

## Contact us

- huy.bui38@hcmut.edu.vn
- tu.do.bk.la@hcmut.edu.vn
