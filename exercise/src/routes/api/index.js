import { Router } from "express";

import { 
    retrieveContacts, 
    updateContact,
    deleteContact,
    createContact,
} from "../../data/contacts-dao.js"



const router = Router();

router.get("/contacts", async (req, res) => {
    return res.json(await retrieveContacts());
});

router.delete("/contacts/:id", async (res, req) =>{
    try{
        const id = req.params.id;
        deleteContact(id);
        return res.status(204);
    }catch(err){
        // return res.status(422).send(err);
    }
})

router.post("/contacts", async (res, req) => {
    try {
        const contact = await createContact(req.body);
        return res.statusCode(201).location(`/contacts/${contact._id}`).json(contact);
    } catch(err){
        return res.status(422).send(err);
    }
});

export default router;