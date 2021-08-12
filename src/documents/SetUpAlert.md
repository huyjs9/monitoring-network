# SET UP SEND MAIL NOTIFICATION ZABBIX SERVER

- **Go to `Configuration/Actions` on Click `Report problems Zabbix administrators`**

- **Set up `Operations`**

  **Subject:**

  ```sh
  Disaster {TRIGGER.NAME} on {HOSTNAME} {EVENT.TIME}
  ```

  **Message:**

  ```sh
  {TRIGGER.NAME} on {HOSTNAME}|
  Problem started at {EVENT.TIME} on {EVENT.DATE}|
  Status:{TRIGGER.STATUS}|
  Severity:{TRIGGER.SEVERITY}|

  Item Graphic: [{ITEM.ID1}]|
  ```

- **Set up `Recovery operations`**

  ```sh
  Resolved {TRIGGER.NAME} on {HOSTNAME} {EVENT.RECOVERY.TIME}
  ```

  **Message:**

  ```sh
  {TRIGGER.NAME} on {HOSTNAME}|
  Probem has been resolved at {EVENT.RECOVERY.TIME} on {EVENT.RECOVERY.DATE}|
  Status: {TRIGGER.STATUS}|
  Severity: {TRIGGER.SEVERITY}|

  Item Graphic: [{ITEM.ID1}]|
  ```
