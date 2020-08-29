import { Router } from 'express';
import { Entry } from '../database/models';

const router = Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.findAll();
        return res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get post by id
router.get('/:id', async (req, res) => {
    try {
        const entry = await Entry.findOne({
            where: { id: req.params.id }
        });

        if(!entry) {
            return res.status(404).json({ message: 'the entry with the given id was not found' });
        }

        return res.status(200).json({ entry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create blog post
router.post('/', async (req, res) => {
    try {
        const { title, body } = req.body;
  
        const entry = await Entry.create({
            title,
            body
        });

        return res.status(201).json({ entry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update post
router.patch('/:id', async (req, res) => {
    try {
        
        const [numberOfRows, rows] = await Entry.update(
            { 
                title: req.body.title,
                body: req.body.body,
            },
            { where: { id: req.params.id }}
        );

        
        if (numberOfRows === 0)
            return res.status(404).json({ message: 'The entry with the given id was not found' });

        console.log(rows)
        return res.status(200).json({ message: 'Success - Entry id was updated' });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
});


// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const entry = await Entry.destroy({ where: { id: req.params.id } });
        if (!entry)
            return res.status(404).json({ message: 'The entry with the given id was not found' });
    
        return res.status(200).json({ message: 'The entry was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;