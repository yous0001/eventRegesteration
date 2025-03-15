import EventModel from "../DB/models/Event.model.js";
import RegisterationModel from "../DB/models/Registeration.model.js";
import { registerEventTemplate } from "../Services/emailTempletes.js";
import sendmailservice from "../Services/sendVerificationEmail.js";

export const register=async (req,res)=>{
    try {
        const {_id,username,email}=req.user
        const {eventId}=req.params

        const event = await EventModel.findById(req.params.eventId);

        if (!event) return res.status(404).json({ message: "Event not found" });
        
        if (event.registeredUsers.includes(_id))
            return res.status(400).json({ message: "You have already registered for this event" });

        if (event.startDate < new Date())
            return res.status(400).json({ message: "Event has already started" });

        if (event.capacity <= event.registeredUsers.length)
            return res.status(400).json({ message: "Event is full" });

        event.registeredUsers.push(_id)
        await event.save();


        const registration = new RegisterationModel({
            event: eventId,
            user: _id,
            status: "confirmed",
        });

        await registration.save();

        const isEmailsent=await sendmailservice({
            to:email,
            subject:`You're Registered for ${event.title}`,
            message:registerEventTemplate(username,event.title,event.location, new Date(event.date).toDateString()),
            attachments:[]
        })

        if(!isEmailsent){
            return res.status(500).json({message:"failed to send verification email"});
        }

        res.status(201).json({ message: "Registration successful", registration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

export const cancelRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;

        const registration = await RegisterationModel.findById(registrationId);
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        if (registration.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await RegisterationModel.findByIdAndDelete(registrationId);

        await EventModel.findByIdAndUpdate(registration.event, {
            $pull: { registeredUsers: registration.user },
        });

        res.status(200).json({ message: "Registration canceled" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getRegistrationsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const registrations = await RegisterationModel.find({ event: eventId }).populate("user");
        res.status(200).json({message:`${registrations.length} registrations found`,registrations});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};