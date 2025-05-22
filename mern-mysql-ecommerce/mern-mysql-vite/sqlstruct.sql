CREATE DATABASE electronics_store;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  stock INT DEFAULT 0,
  category_id INT,
  brand_id INT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE product_specifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  spec_name VARCHAR(100),
  spec_value VARCHAR(255),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
 
 CREATE TABLE reviews (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
rating INT CHECK (rating BETWEEN 1 AND 5),
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_images (
id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
image_url VARCHAR(255) NOT NULL,
is_main BOOLEAN DEFAULT FALSE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE wishlists (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE delivery_addresses (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
full_name VARCHAR(100),
phone_number VARCHAR(20),
address_line1 VARCHAR(255),
address_line2 VARCHAR(255),
city VARCHAR(100),
state VARCHAR(100),
postal_code VARCHAR(20),
country VARCHAR(100),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);