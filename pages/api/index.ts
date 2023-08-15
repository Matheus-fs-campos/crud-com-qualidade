import { NextApiRequest, NextApiResponse } from "next";

export default function Handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    response.status(200).json({ message: "Ola mundo" });
}
