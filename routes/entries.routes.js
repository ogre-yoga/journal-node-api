import { Router } from 'express';

const router = Router();

// Create blog post
router.post('/', async (req, res) => {
    try {
        res.send('creating entry');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get all blog posts
router.get('/', async (req, res) => {
    try {
        res.send('getting all entries');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get post by id
router.get('/:id', async (req, res) => {
    try {
        res.send('getting single entry');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update blog post
router.patch('/:id', async (req, res) => {
    try {
        res.send('updating entry');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a blog post
router.delete('/:id', async (req, res) => {
    try {
        res.send('deleting entry');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;