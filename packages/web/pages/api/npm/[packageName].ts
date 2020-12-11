import * as Tydoc from '@tydoc/extractor'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const epd = await Tydoc.fromPublished({
    packageName: req.query.packageName as string,
  })

  res.status(200).json(epd)
}
