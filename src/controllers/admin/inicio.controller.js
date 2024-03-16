// imports

// pages
export const mainPage = async (req, res) => {
  const user = req.user

  res.render('admin/index', { user})
}

// proc

// helpers
