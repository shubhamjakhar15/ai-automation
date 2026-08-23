const { getAuth, clerkClient } = require("@clerk/express");

const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user details from Clerk to check publicMetadata
    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata?.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { requireAdmin };
