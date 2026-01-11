// controllers/admin.controller.js
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res) => {
  try {
    // 1️⃣ Получаем данные из body
    const { email, password } = req.body;

    // 2️⃣ Проверяем: есть ли такой email
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // 3️⃣ ХЕШИРУЕМ пароль (ОЧЕНЬ ВАЖНО)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Создаём админа в БД
    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    // 5️⃣ Отправляем ответ (БЕЗ пароля!)
    res.status(201).json({
      message: "Admin created",
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Ищем пользователя
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Wrong email or password" });
  }

  // 2️⃣ Проверяем роль
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Not an admin" });
  }

  // 3️⃣ Сравниваем пароли
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Wrong email or password" });
  }

  // 4️⃣ Создаём TOKEN
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );

  // 5️⃣ Отправляем токен
  res.json({ token });
};
