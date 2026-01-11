import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Нет заголовка Authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // 2️⃣ Достаём token
  const token = authHeader.split(" ")[1];

  try {
    // 3️⃣ Проверяем token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Сохраняем пользователя в req
    req.user = decoded;

    next(); // ✅ пускаем дальше
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
