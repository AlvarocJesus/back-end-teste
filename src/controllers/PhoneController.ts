import { Request, Response } from 'express';
import * as Yup from 'yup';

import { connection } from '../database/connection';

interface PhoneBody{
  model: string, //Alfanumérico com no mínimo 2 e no máximo 255 caracteres, desprezando espaço em branco.
  price: number, //positivo
  brand: string, //Alfanumérico com no mínimo 2 e no máximo 255 caracteres, desprezando espaço em branco.
  startDate: string, //Data no formato “dd/MM/yyyy” (31/12/2018). A data de início deve ser posterior ao dia 25/12/2018.
  endDate: string, //Data no formato “dd/MM/yyyy” (31/12/2018). A data de fim deve ser posterior a data de início.
  color: 'BLACK' | 'WHITE' | 'GOLD' | 'PINK',
  code: string
}

export default {
  async index(req: Request, res: Response){
    const phones = await connection('smartphones').select('*');

    return res.json(phones);
  },

  async show(req: Request, res: Response){
    const { id } = req.params;
    const phone = await connection('smartphones').select({ id });

    return res.json(phone);
  },

  async create(req: Request, res: Response){
    try{
      /* const {
        model,
        price,
        brand,
        startDate,
        endDate,
        color,
        code
      } = req.body; */

      const data : PhoneBody = req.body;

      const dateMin = '25/12/2018';

      if (data.startDate > dateMin) {
        if((data.price > 0) && (data.price !== null)){
					await connection('smartphone').insert(data);

          console.log(data);

				  return res.status(201).json("Celular adicionado com sucesso!");
				} else {
          return res.json({ Error: 'Preço precisa ser um valor maior do que 0(zero)' })
				}
      } else {
        return res.json({ Error: 'A data de inicio das vendas precisa ser posterior à 25/12/2018' })
			}

      /* const schema = Yup.object({
        model: Yup.string().min(2).max(255).strict().required(),
        price: Yup.number().positive().required(),
        brand: Yup.string().min(2).max(255).strict().required(),
        startDate: Yup.string()
          .required(),
          .min(
            Yup.ref(dateMin),
            "a data de inicio da venda não pode ser anterior à 25/12/2018"
          ),
        endDate: Yup.string().min(
          Yup.ref('startDate'), "a data de fim da venda não pode ser anterior à data de início"),
        color: Yup.string().required(), //.equals(['BLACK', 'WHITE', 'GOLD', 'PINK'])
        code: Yup.string().min(8).max(8).required()
      });

      await schema.validate(data, {
        abortEarly: false,
      }) */

      // await connection('smartphone').insert(data);
    } catch(err){
      console.log(err);
      return res.send(err);
    }
  },

  async update(req: Request, res: Response){
    try{
      const {
        model,
        price,
        brand,
        startDate,
        endDate,
        color,
        code
      } = req.body;
      const { id } = req.params;

      await connection('smartphone')
        .update({
          model,
          price,
          brand,
          startDate,
          endDate,
          color,
          code
        })
        .where({ id });

      return res.status(201).json("Dados atualizados!");
    } catch(err){
      return res.json(err)
    }
  },

  async delete(req: Request, res: Response){
    try{
      const { id } = req.params;

      await connection('smartphone')
        .delete(id)
        .update('deleted_at');

      return res.status(200).json("Celular deletado com sucesso!");
    } catch(err){
      return res.json(err);
    }
  },
}