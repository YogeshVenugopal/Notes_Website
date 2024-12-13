import Note from "../Models/note.model.js";

export const addNote = async(req, res) => { 
    const {title, content, tags} = req.body;
    const user = req.user;

    try {
        if(!title || !content){
            return res.status(400).json({error:"All fields are required."});
        }
        const note = new Note({
            title, 
            content, 
            tags:tags||[],
            userId:user.id});

        await note.save();
        res.status(200).json({note, message:"Note added successfully."});

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error."});
    }

}

export const editNote = async(req,res) => {
    const id = req.params.id;
    const {title,content,tags,isPinned} = req.body;
    const user = req.user;
    try {
        if(!title && !content && !tags){
            return res.status(400).json({error:"We can't update this note."});
        }
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({error:"Note not found."});
        }
        if(note.userId !== user.id){
            return res.status(403).json({error:"You can't update this note."});
        }
        note.title = title || note.title;
        note.content = content || note.content;
        note.tags = tags || note.tags;
        note.isPinned = isPinned || note.isPinned;
        await note.save();
        res.status(200).json({note, message:"Note updated successfully."});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error."});
    }
}

export const getNotes = async(req,res) => {
    const user = req.user;
    try {
        const notes = await Note.find({userId:user.id}).sort({isPinned:-1});
        res.status(200).json({notes,message:"Notes fetched successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error."});
    }
}

export const deleteNote = async(req,res) => {
    const id = req.params.id;
    const user = req.user;
    try {
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({error:"Note not found."});
        }
        if(note.userId !== user.id){
            return res.status(403).json({error:"You can't delete this note."});
        }
        await Note.findByIdAndDelete(id);
        res.status(200).json({message:"Note deleted successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error."});
    }
}

export const updatePinned = async(req,res) => {
    const id = req.params.id;
    const isPinned = req.body;
    const user = req.user;
    if(!isPinned){
        return res.status(400).json({error:"We can't update this note."});
    }
    try {
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({error:"Note not found."});
        }
        if(note.userId !== user.id){
            return res.status(403).json({error:"You can't update this note."});
        }
        note.isPinned = !note.isPinned;
        await note.save();
        res.status(200).json({note, message:"Note updated successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error."});
    }
}