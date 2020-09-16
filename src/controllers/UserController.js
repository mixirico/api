import { User } from '../models';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { ...user } = req.body;

    const { nome: name, email } = await User.create(user);

    return res.status(201).json({ name, email });
  }
}

export default new UserController();
