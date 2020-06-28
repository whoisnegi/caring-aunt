const control = {

  blogs: (req, res) => {
    res.render('blog');
  },
  includeBlog1: (req, res) => {
    res.render('track-your-period');
  },
  includeBlog2: (req, res) => {
    res.render('amazing-facts');
  },
  includeBlog3: (req, res) => {
    res.render('period-brunch');
  }
};

module.exports = control;