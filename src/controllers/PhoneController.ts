import { NextFunction, Request, Response } from 'express';

import { connection } from '../database/connection';

interface PhoneBody{
  model: string,
  price: number,
  brand: string,
  startDate: string,
  dateEnd: string,
  color: 'BLACK' | 'WHITE' | 'GOLD' | 'PINK',
  code: string
}

export default {
  async index(req: Request, res: Response){
    const phones = await connection('smartphone').select('*');

    return res.json(phones);
  },

  async show(req: Request, res: Response){
    const { code } = req.params;
    const phone = await connection('smartphone').where({ code });

    return res.json(phone);
  },

  async create(req: Request, res: Response, next: NextFunction){
    try{
      const data : PhoneBody = req.body;

      const dateMin = '25/12/2018';
      var arrDataMin = dateMin.split('/');
      var stringFormatada = arrDataMin[1] + '-' + arrDataMin[0] + '-' + arrDataMin[2];
      const minDate = new Date(stringFormatada);

      var arrDataStart = data.startDate.split('/');
      var stringFormatStart = arrDataStart[1] + '-' + arrDataStart[0] + '-' + arrDataStart[2];
      const startDate = new Date(stringFormatStart);

      if ((startDate.getTime() > minDate.getTime())/* && ( > startDate.getTime())*/) {
        if((data.price > 0) && (data.price !== null)){
          if((data.color === 'BLACK') || (data.color === 'GOLD') || (data.color === 'PINK') || (data.color === 'WHITE')){
            const phone = await connection('smartphone').where('code', data.code);

            // console.log(phone)
            console.log(phone.values)

            await connection('smartphone').insert(data);

            console.log(data);

            return res.status(201).json("Celular adicionado com sucesso!");
          } else{
            return res.json({ Error: 'A cor precisa ser BLACK, GOLD, PINK ou WHITE' });
          }
          
				} else {
          return res.json({ Error: 'Preço precisa ser um valor maior do que 0(zero)' })
				}
      } else {
        return res.json({ Error: 'A data de inicio das vendas precisa ser posterior à 25/12/2018' })
			}

    } catch(err){
      console.log(err);
      next(err)
    }
  },

  async update(req: Request, res: Response, next: NextFunction){
    try{
      const {
        model,
        price,
        brand,
        dateEnd,
        color,
      } = req.body;
      const { code } = req.params;

      await connection('smartphone')
        .update({
          model,
          price,
          brand,
          dateEnd,
          color,
        })
        .where({ code });

        return res.status(201).json("Dados atualizados!");
    } catch(err){
      next(err)
    }
  },

  async delete(req: Request, res: Response, next: NextFunction){
    try{
      const { code } = req.params;
      console.log(code)

      await connection('smartphone')
        .where({ code })
        .del()
        //.update('deleted_at', new Date());

      return res.status(200).json("Celular deletado com sucesso!");
    } catch(err){
      console.log(err)
      next(err);
    }
  },
}