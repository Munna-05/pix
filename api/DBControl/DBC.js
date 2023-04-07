import Users from "../Schema/UserSchema.js";
import Images from '../Schema/ImagesSchema.js'

const DBC = {

    saveUser: async (data) => {
        const users = new Users(data)
        const saved = await users.save();
        console.log('saved')
        if (saved) return saved;
    },
    findByEmail: async (data) => await Users.findOne({ Email: data }),
    FindById: async (id) => await Users.findById(id),
    FindAllUsers: async () => await Users.find(),
    deleteUser: async (id) => await Users.findByIdAndDelete(id),

    //image
    findAllImages: async () => await Images.find().sort({ createdAt: -1 }),

    findImagesByUser: async (id) => await Images.find({ userId: id }).sort({ createdAt: -1 }),

    findByImageId:async(id)=>await Images.findOne({_id:id}),

    findAndUpdateWithThumb: async (id, data) => {
        try {
            const res = await Images.findOneAndUpdate({ _id: id }, { thumbs: data }, { new: true })
            if (res) return res
        } catch (error) {

            console.log(error)

        }
    },
    saveImage: async (userid, imagepath) => {
        const data = {
            imagePath: imagepath,
            userId: userid
        }
        const doc = new Images(data)
        const saved = await doc.save()
        if (saved) return saved
    }
}

export default DBC;       