# **ABANG KELILING**

## github rules

naming branch:

```
<username>/<routes>/<features>
```

urutan:

1. dari branch development
2. git pull
3. git checkout -b "branch baru"
4. kerjain features
5. kalau udah git add . -> git commit -> git push origin "branch baru"
6. pull request di github
7. kalau merge panggil yang lain jangan sendiri
8. kalau udah di merge git checkout development
9. loop ke nomor 2

## Tools

Server:

- Express
- axios/fetch
- Redis
- Cors
- JWT
- Bcryptjs
- JEST
- MongoDB/Postgres
- cloudinary
- gmaps/mapbox
- Payment (optional)

Client:

- React-native
- MapView
- TaskManager
- Mongoose
- async storage (access_token mobile)

## Setup

note: bikin email buat team

> email: abangkelilingh8@gmail.com
> pass: Abangkeliling123

> github : https://github.com/orgs/Team4-AbangKeliling/dashboard

> mongodb:

> redislabs:
> cloudinary email : abangkelilingh8@gmail.com
> cloudinary password : Abangkeliling123!

## Folder Structure

- customer-mobile
- seller-mobile
- server
  - app (4000)

## Task-List

### customer-mobile

references: Go-Food / GrabFood

- [ ] MockUp

- [ ] Routing (stack & tab)
- [ ] Layout Register Page
- [ ] Layout Login Page
- [ ] Layout Home
- [ ] Layout Seller List Page
- [ ] Layout Menu List Page
- [ ] Layout Cart Page
- [ ] Layout on going order Page (maps, dll)
- [ ] Layout History Page
- [ ] Wiring with server

### seller-mobile

references: GoBiz

- [ ] Routing (stack & tab)
- [ ] Layout Register Page
- [ ] Layout Login Page
- [ ] Layout Home Page
- [ ] Layout Product List Page
- [ ] Layout Add Product Page
- [ ] Order Page
- [ ] Wiring with server

dalam proses | selesai | batal

### Server

- [ ] testing
- [ ] Routing Customer
- [ ] Routing Seller
- [ ] Routing Product | Category | Order
- [ ] MVC Customer
- [ ] MVC Seller
- [ ] MVC Product | Category | Order

### routing

#### routing customer

> POST /customers/register

> POST /customers/login

> GET /customers/:id

> PATCH /customers/:id (location)

#### routing sellers

> GET /sellers

> POST /sellers/register

> POST /sellers/login

> PATCH /sellers/:id (location)

#### routing products

> GET /products

> POST /products

> PUT /products/:id

> DELETE /products/:id

#### routing orders

> GET /orders

> POST /orders

> GET /orders/:id

> GET /orders?status=

> PATCH /orders/:id (status)

#### routing categories

> GET /categories

di seeding
