const { createError } = require("../Utils/error")
const Event  = require('../Models/event')


const createEvent  = async(req,res,next) => {

       const data = {
              ...req.body,
              images:req.file.filename
       }
       try { 
            await Event.create(data)  
            res.status(200).json("success")
       } catch (error) {
             next( createError(401,'Event Creation Failed'))
       }
}

const allEvents  = async(req,res,next) => {
       
       try {

              let query = { eventName: { $regex: new RegExp(req.query.searchText || '', "i") } };
              let sortOption = {};
        
        if (req.query.sortOption === 'near') {
            sortOption = { date: 1 };
        } else if (req.query.sortOption === 'far') {
            sortOption = { date: -1 };
        }


          if (req.query.filterOption == 'Science') {
              query.eventType = {$eq:'Science'};
          } else if (req.query.filterOption == 'Technology') {
              query.eventType = {$eq:'Technology'};
          }else if (req.query.filterOption == 'Money') {
              query.eventType = {$eq:'Money'};
          }else if (req.query.filterOption == 'Foods') {
              query.eventType = {$eq:'Foods'};
          }else if (req.query.filterOption == 'Education') {
              query.eventType = {$eq:'Education'};
          }

        let data = await Event.find(query).sort(sortOption);
        console.log(data);
        res.status(200).json(data);

       } catch (error) {
             next( createError(401,'Events fetching Failed')) 
       }
}



const singleEvent  = async(req,res,next) => {
       
       try {
           const data =  await Event.findById(req.params.id)
           res.status(200).json(data)
       } catch (error) {
             next( createError(401,'Event fetching Failed'))
       }
}

module.exports = {
       createEvent,
       allEvents,
       singleEvent
}