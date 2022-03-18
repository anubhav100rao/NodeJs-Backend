const Task = require('../models/Task')

const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({
            tasks
        })
    } catch(err) {
        res.status(500).json({err})
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const getTask = async(req, res) => {
    try {
        const {id: taskId} = req.params
        if(!taskId) {
            return res.status(404).json({err: "No such task exists"})
        }
        console.log(req.params)
        const task = await Task.findById(req.params.id)
        // const task = await Task.findOne({_id: req.params.id})
        res.status(200).json({
            task
        })
    } catch(err) {
        res.status(500).json({err})
    }
    
}

const updateTask = async(req, res) => {
    try {
        const {id: taskId} = req.params
        if(!taskId) {
            return res.status(404).json({error: "id can not be null"})
        }
        const task = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            task
        })
    } catch(err) {
        res.status(500).json({err: "something went wrong"})
    }
}

const deleteTask = async(req, res) => {
    try {
        const {id: taskId} = req.params
        if(!taskId) {
            return res.status(404).json({err: `No such ${taskId}`})
        }
        const task = await Task.deleteOne({_id: taskId})
        res.status(200).json({task})
    } catch(err) {
        res.status(500).json(err)
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}