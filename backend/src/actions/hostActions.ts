import mongoose from "mongoose";
import Property from "../models/Property";
import Room from "../models/Room";
import slugify from "../utils/slugify";
import User from "../models/User";

export const viewProperties = async () => {
  try {
    const properties = await Property.find();

    if (!properties.length) {
      return `🏠 You don't have any active properties yet.\nUse "Add Property" to get started.`;
    }

    return `🏘️ *Your Active Properties:*\n\n${properties
      .map((el, i) => `🔹 ${i + 1}. *${el.name}*`)
      .join("\n")}`;
  } catch (error) {
    throw error;
  }
};

export const addProperty = async (data: any): Promise<string> => {
  try {
    const { name } = data;
    await new Property({
      userId: new mongoose.Types.ObjectId("6860e8ec05c14c5a13d59d2f"),
      name,
      slug: slugify(name),
    }).save();

    return `✅ *${name}* has been successfully added to your properties!\n\n🏡 You're one step closer to hosting.`;
  } catch (error) {
    throw error;
  }
};

export const addRoom = async (data: any): Promise<string> => {
  try {
    const { property_name, name, price } = data;
    const property = await Property.findOne({ slug: slugify(property_name) });

    await new Room({
      propertyId: property?._id,
      name,
      price,
      status: "available",
    }).save();

    return `🛏️ *Room Added!*\n\n📍 Property: *${property?.name}*\n🛌 Room: *${name}*\n💸 Price: ₹${price}/night\n\n✅ Ready for booking!`;
  } catch (error) {
    throw error;
  }
};

export const viewRooms = async (name: string) => {
  try {
    const property = await Property.findOne({ slug: slugify(name) });
    const rooms = await Room.find({ propertyId: property?._id });

    if (!rooms.length) {
      return `😕 No rooms found for *${property?.name}* yet.\nTry adding one using "Add Room".`;
    }

    return `🛏️ *Rooms at ${property?.name}:*\n\n${rooms
      .map(
        (el, i) =>
          `🔹 ${i + 1}. *${el.name}* — ₹${el.price}/night (${el.status})`
      )
      .join("\n")}`;
  } catch (error) {
    throw error;
  }
};

export const registerNewUser = async (data: any) => {
  try {
    const user = await User.findOne({ phone: data.phone });
    if (!user) {
      await new User({
        phone: data.phone,
        role: data.role,
      }).save();
    }

    if (data.role === "host") {
      return `
👋 Welcome to Help My Stay!

I’m your assistant for managing your property bookings.

What would you like to do today?
1️⃣ Add a new property
2️⃣ Update pricing or availability
3️⃣ Block a room
4️⃣ View bookings summary
5️⃣ Ask a question

You can just reply with your request, like:
➡️ "Block Room 2 from July 5 to July 7"
➡️ "Change price of Room 1 to ₹1500 for Saturday"
            `;
    } else {
      return `
Hey there, I am Help My Stay, Your go to assistant for hotel bookings
Try 
  View my hotel bookings
  Give directions to my hotel
`;
    }
  } catch (error) {
    throw error;
  }
};
