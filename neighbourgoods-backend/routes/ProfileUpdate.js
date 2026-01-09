router.put("/updateProfile", async (req, res) => {
  const { name, profilePicture } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, profilePicture },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});
