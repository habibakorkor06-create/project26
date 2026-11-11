# Waffra

**Course:** Electronic Business Development (BINF 503) · Winter 2026
**Instructor:** Dr. Nourhan Hamdi
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team

| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| habiba korkor | 16008701 | T3 | habibakorkor06-create |
| hana badr | 16008356 | T3 | hana-badr |
| hanya ayman | 16003275 | T3| hanyaa416-blip |
| jana shekshaka | 16009838 | T3 | janamoahmed188-oss |
| maya elkilany | 16001119| T3 | MayaElkilany |

## 2. The idea

Waffra is a web application that fights food waste by connecting local stores with people who want good food at a lower price. Bakeries, restaurants, cafes and groceries list surprise bags of unsold food at a discount, and customers browse, reserve and pick them up during a set time window. It is for store owners who want to avoid throwing away good food and for customers who want affordable meals, and it solves the problem of edible surplus food going to waste every day.

## 3. Features

### 3.1 The full product

- Registration and login as a customer or as a store
- Store profile with name, address, category and description
- Surprise bags with price, quantity and pickup window
- Browse available bags, with filtering by category
- Reserve a bag and receive a pickup confirmation
- Order history with cancel and mark-as-collected
- Ratings and reviews for stores
- Favorite stores
- Search and sort by distance, price and rating
- Map view of nearby stores
- Online payment
- Push and email notifications for new bags and pickup reminders
- Impact tracker showing food saved and money saved
- Admin panel to manage users and stores

### 3.2 The use cases we will build

| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with name, email, password and account type (customer or store); logs in with email and password | Their home page (customer browse page or store dashboard), with their name in the header | A User, with the password hashed and a role |
| 2 | Manage store and bags | A store owner creates their store profile, then posts, edits and deletes surprise bags with price, quantity and pickup window | A dashboard listing their bags with remaining quantity | A Store and its Bags |
| 3 | Browse and reserve a bag | A customer browses available bags, filters by category, and reserves a bag | A list of available bags, then a confirmation with pickup time | An Order, and the Bag's quantity reduced |
| 4 | Manage my orders | A customer views their orders and cancels a reservation; the store marks an order as collected | An order history with status (reserved, collected, cancelled) | The Order's status updated, and the Bag's quantity restored on cancel |
| 5 | Review a store | After collecting an order, a customer rates the store and leaves a comment, and can edit or delete it | The store's page with its average rating and reviews | A Review |

## 4. Who owns what

| Member | Use case |
|---|---|
| [Hana badr] | 1. Registration and login |
| [Jana shekhshaka] | 2. Manage store and bags |
| [Habiba korkor] | 3. Browse and reserve a bag |
| [hanya ayman] | 4. Manage my orders |
| [Maya amr] | 5. Review a store |

## 5. Data model

### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false }, // stored hashed, never as plain text
  role: { type: String, enum: ["customer", "store"], default: "customer" },
});
```

### Store

```js
const storeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // one store per owner
  name: { type: String, required: true },
  address: { type: String, required: true },
  category: {
    type: String,
    enum: ["bakery", "restaurant", "cafe", "grocery", "other"],
    default: "other",
  },
  description: { type: String },
});
```

### Bag

```js
const bagSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  title: { type: String, required: true },
  description: { type: String },
  originalPrice: { type: Number, required: true, min: 0 },
  discountedPrice: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (v) { return v <= this.originalPrice; },
      message: "Discounted price cannot be more than the original price",
    },
  },
  quantityAvailable: { type: Number, required: true, min: 0 },
  pickupStart: { type: Date, required: true },
  pickupEnd: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) { return v > this.pickupStart; },
      message: "Pickup end must be after pickup start",
    },
  },
});
```

### Order

```js
const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bag: { type: mongoose.Schema.Types.ObjectId, ref: "Bag", required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    quantity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["reserved", "collected", "cancelled"],
      default: "reserved",
    },
  },
  { timestamps: true }
);
```

### Review

```js
const reviewSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, unique: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);
```

## 6. Run it locally

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on http://localhost:3000.

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |
| [Any other variable] | [What it is] |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app runs on [the address `npm run dev` prints, e.g. http://localhost:5173].
