import { Request, Response, } from "express";
import shortId from 'shortid';
import { config } from "../config/Constants";
import { URlModel } from "../database/model/URL";

export class URLController {
    public async shorten(Request: Request, Response: Response): Promise<void> {

        const { originURL } = Request.body

        const url = await URlModel.findOne({ originURL })

        if (url) {
            Response.json(url)
            return
        }

        const hash = shortId.generate()

        const shortURL = `${config.API_URL}/${hash}`
        const newURL = URlModel.create({ hash, shortURL, originURL })
        Response.json({ newURL })
    }

    public async redirect(Request: Request, Response: Response): Promise<void>{

        const { hash } = Request.params
        const url = await URlModel.findOne({ hash })

        if (url) {
            Response.redirect(url.originURL)
            return
        }

        Response.status(400).json({error: 'URL not found'})
    }
}