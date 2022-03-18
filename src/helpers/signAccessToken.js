import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const signAccessToken = (userID) => {
  return new Promise((resolve, reject) => {
    if (!userID) {
      reject(new Error("userID is required"));
    }

    jwt.sign( { id: userID }, JWT_SECRET, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
};
