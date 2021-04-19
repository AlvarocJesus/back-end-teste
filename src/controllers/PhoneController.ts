import { Request, Response } from 'express';
import * as Yup from 'yup';
import { connection } from '../database/connection';

interface PhoneBody{
  model: string, //Alfanumérico com no mínimo 2 e no máximo 255 caracteres, desprezando espaço em branco.
  price: number, //positivo
  brand: string, //Alfanumérico com no mínimo 2 e no máximo 255 caracteres, desprezando espaço em branco.
  startDate: Date, //Data no formato “dd/MM/yyyy” (31/12/2018). A data de início deve ser posterior ao dia 25/12/2018.
  endDate: Date, //Data no formato “dd/MM/yyyy” (31/12/2018). A data de fim deve ser posterior a data de início.
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
      const {
        model,
        price,
        brand,
        startDate,
        endDate,
        color,
        code
      } = req.body;

      const schema = Yup.object().shape({
        model: Yup.string().min(2).max(255).strict(),
        price: Yup.number().positive(),
        brand: Yup.string().min(2).max(255).strict(),
        // startDate: Yup.date().min("25/12/2018"),
        // endDate: Yup.date(),
        startDate: Yup.date().min(
          Yup.ref('2018-12-25'), "a data de inicio da venda não pode ser anterior à 25/12/2018"),
        endDate: Yup.date().min(
          Yup.ref('startDate'), "a data de fim da venda não pode ser anterior à data de início"),
        color: Yup.string().equals(['BLACK', 'WHITE', 'GOLD', 'PINK']),
        code: Yup.string().max(8)
      })

      /* const dateMin = new Date(2018, 12, 25);
      const dateInicial = new Date(startDate);
      const dateFinish = new Date(endDate);

      if (dateInicial > dateMin) {
        console.log(dateInicial);
        console.log(dateFinish);
      } */

      /* if(price > 0){
        await connection('smartphone')
        .insert({
          model,
          price,
          brand,
          startDate,
          endDate,
          color,
          code
        });
      } else{
        return res.json("Preço precisa ser um valor positivo.")
      } */
      console.log({
        model,
        price,
        brand,
        startDate,
        endDate,
        color,
        code
      })

      // return res.status(201).json("Celular adicionado com sucesso!");
      return res.json("Celular adicionado com sucesso!");
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