## 用户登录

```
POST /account/login
```

```json
{
	"email":"test@test.com",
	"password":"admin"
}
```
### 输入

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| email | 字符串 | **必须**，email |
| password | 字符串 | **必须** |


#### 响应

```
Status: 200
```
```json
{
    "status":200,
    "message":"",
    "data":{
        "account": {
            "id": 1,
            "email": "admin@admin.com",
            "created_at": "2017-12-10 12:00:55",
            "updated_at": "2017-12-11 05:31:23"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMjk3MDI4MywibmJmIjoxNTEyOTcwMjgzLCJleHAiOjE1NDQ1MDYyODMsImRhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyeSQxMCRUNXkxeE8xaU1vOFhDXC9pZzNXcUM5T1wvbVg1b2llNEhnQXlCeVhJcFMzZm1yMFVmd2M3RXF5Iiwicm9sZXMiOm51bGx9fQ.EnTOTq30dAKiGjEQQiSO-tOfQ7-r5nC9dt592_0cIJM"
    }
}
```


## 用户注册

```
POST /account/register
```

```json

{
	"email":"test@test.com",
	"password":"123456",  
	"captcha":"4444"

}
```
### 输入

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| username | 字符串 | **必须**，用户名 |
| password | 字符串 | **必须**，密码。 |
| captcha | 字符串或数字 | **必须**，用户收到的验证码。 |

#### 响应

```
Status: 200
```
```json
{
    "status":200,
    "message":"",
    "data":{
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMjk3NDQxNSwibmJmIjoxNTEyOTc0NDE1LCJleHAiOjE1NDQ1MTA0MTUsImRhdGEiOnsiaWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yMzMzIiwicGFzc3dvcmQiOiIkMnkkMTAkRlJcL1RpZkgyQWFMRTdHTS5TWGNhSGVka1Vhak1kUEI5QUJMTnljQU5iczA2YThsclpwVDJtIiwicm9sZXMiOm51bGx9fQ.mi9n8gsZf2Yh6pW9MGxSmxBf9QQD-XeJWRiGuf_YJKI"

    }
}
```



## 忘记密码


POST /account/forget

### 输入

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| email | 字符串 | **必须** email |
| password | 字符串 | **必须**，密码。 |
| captcha | 字符串或数字 | **必须**，用户收到的验证码。 |




```
Status: 200
```
```json
{
    "status": 200,
    "message": "ok",
    "data":null
}
```


## 更新密码


POST /account/changePassword

### 输入

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| email | 字符串 | **必须** email |
| old_password | 字符串 | **必须**，旧密码。 |
| password | 字符串 | **必须**，新密码。 |
 
```
Status: 200
```
```json
{
    "status": 200,
    "message": "ok",
    "data":null
}
```


## 总收益


POST /account/balances


```
Status: 200
```
```json
{
    "status": 200,
    "message": "ok",
    "data":{
        "can_use_balance":5.5,
        "total_balance":15.5
        
    }
}
```

### 输出

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| can_use_balance | number | 可用余额 |
| total_balance | Number | 累计余额 |
  