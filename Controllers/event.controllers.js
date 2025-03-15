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


export const updateEvent = async (req, res) => {
        try {
            const { title, description, date, location, capacity } = req.body;
            
            const event = await EventModel.findById(req.params.eventId);
            if (!event) return res.status(404).json({ message: "Event not found" });
        
            if (event.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to update this event" });
            }
            
            if(title)
                event.title = title 
            if(description)
                event.description = description 
            if(date)
                event.date = date 
            if(location)
                event.location = location
            if(capacity)
                event.capacity = capacity
        
            await event.save();
            res.status(200).json({ message: "Event updated successfully!", event });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
};

export const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find().populate("createdBy", "username email");
        res.status(200).json({message:"Events fetched successfully",events});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
        try {
            const event = await EventModel.findById(req.params.eventId);
            if (!event) return res.status(404).json({ message: "Event not found" });
        
            if (event.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to delete this event" });
            }
        
            await event.deleteOne();
            res.status(200).json({ message: "Event deleted successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
};
