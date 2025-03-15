import EventModel from "../DB/models/Event.model.js";

export const createEvent=async(req, res, next) => {
    try {
        const { title, description, location, date,capacity } = req.body;
        const {_id}=req.user

        const event = new EventModel({ title, description, location, date, capacity, createdBy: _id });
        await event.save();
        res.status(201).json({ message: 'Event created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
}