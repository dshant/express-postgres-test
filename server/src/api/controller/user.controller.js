const httpStatus = require('http-status');
const { omit } = require('lodash');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(transformUser(req.locals.user));

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(transformUser(req.user));

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      // Create user with hashed password
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
        },
      });
      
      res.json(transformUser(user));
    } catch (error) {
      next(checkDuplicateEmail(error));
    }
  };

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  const updatedUser = omit(req.body);

  try {
    const user = await prisma.user.update({
      where: { id: req.locals.user.id },
      data: updatedUser,
    });
    res.json(transformUser(user));
  } catch (error) {
    next(checkDuplicateEmail(error));
  }
};

exports.updateProfile = async (req, res, next) => {
  const updatedUser = omit(req.body);

  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updatedUser,
    });
    res.json(transformUser(user));
  } catch (error) {
    next(checkDuplicateEmail(error));
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const users = await prisma.user.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.json(users.map(transformUser));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
  const { user } = req.locals;

  try {
    await prisma.user.delete({ where: { id: user.id } });
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Transform user data
 * @private
 */
function transformUser(user) {
  const transformed = {};
  const fields = ['id', 'email', 'name', 'createdAt'];

  fields.forEach((field) => {
    transformed[field] = user[field];
  });

  return transformed;
}

/**
 * Check for duplicate email error
 * @private
 */
function checkDuplicateEmail(error) {
  if (error.code === 'P2002' && error.meta.target.includes('email')) {
    return new Error('Email already exists');
  }
  return error;
}
