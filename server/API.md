# e-Commerce API Documentation

## progress
### next: Upload image to GCS

- using token for dummy, email ypl@gmail.com, pass 123 

``` javascript
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImNhcnQiOlsiNWNkYTlhNGFhZDBjYTY0YjEzYzFlNjVkIl0sIl9pZCI6IjVjZGE5NGJjMzA0ZDEwNDk4NTA2ZWNjZSIsIm5hbWUiOiJ5b25hdGhhbiIsImVtYWlsIjoieXBsQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JDVTb0w4SEJ0MHdodm5WcnNNQXNtb09oQjcuYi8xQUxHUWtiejVXSlMzMnl3SXdxRWdOOVg2IiwiX192IjowfSwiaWF0IjoxNTU4MDM1OTcyfQ.O28UqJ96ZJzg2oDxnffU9CyndSxppYTYoh83C4At1XM
``` 
- API endpoints is usable (need to complete test)
- Axios process is done in API
- Succeed connecting to database, and fetching the documents to be shown in front page
- Add to cart component called action to vuex ()
- Retrieved data from cart in Vuex
- Add and subtract qty from cart page
- Uploaded new product for seller


## /signin and signup

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/signin`     | POST    | Sign in |          |  email:String, password: String                               |
| `/signup` | POST    | Create new User |     | name:String, email: String, password: String                                 |


## /product

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/product`     | GET    | Get all products      |token          |                                  |
| `/product/myShop`     | GET    | Get products uploaded by user     |token          |                                  |
| `/product/:id` | GET    | Get info for a specific product based on the product id  | token    |                                  |
| `/product`     | POST   | Add a new product, seller id specified from token   |  token | name:String, stock:Number, description:String, category:String, price:Number, image:multiform/form-data
| `/product/:id` | DELETE | Delete a specific product based on its id, only the seller can delete authorized from token               | token    |                                  |
| `/product/:id` | PATCH  | Update a specific product based on its id, only the seller can delete, authorized from token |          | name:String, stock:Number, description:String, image:multiform/form-data|  

## /user


| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/user/cart/add/:productId`     | PATCH    | add item in users cart     |token          |                                 |
| `/user/cart/remove/:productId`     | PATCH    | remove item in users cart     |token          |                                  |
| `/user/cart`     | GET    | get cart information about loggedin user     |token          |                                  |
| `/user/cart`     | PATCH    | remove all content within the user's cart |token          |                                  |


