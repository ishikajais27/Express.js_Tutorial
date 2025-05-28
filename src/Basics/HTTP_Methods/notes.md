Core HTTP Methods:
GET: Retrieve data from server (safe, idempotent)
POST: Create new resource/and sends to server (not idempotent)
PUT: Update/replace entire resource (idempotent)
DELETE: Remove resource (idempotent)
PATCH: Partial update (not always idempotent)

in express we do not use res.writeHead and res.end() because res.send() already has these two so no need to write it.
for post method first we need to parse the incoming data for json-> app.use(express.json()) and for html form data-> app.use(express.urlencoded({extended:true}))
res.send() and res.json() slightly different try to use res.json() for api projects as res.json() only use for json and res.send() for any string,buffer,json etc..

Always check if the resource exists before deleting it.
Send clear success/failure messages in the response.
Use res.status(404).json(...) for "not found" cases.
You can also return the deleted resource for confirmation.
