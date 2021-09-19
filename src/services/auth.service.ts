import { getConnection, getConnectionManager, getRepository, getManager } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';
import {Auth} from "../entity/Auth"

export class AuthService {
 // private packageRepository: any;

  public static createUser = async (post: AuthDto):Promise<AuthDto> => {
    const AuthRepository = getManager().getRepository(Auth);
    let newPost = await AuthRepository.save(post);

    return newPost;
   
  } 

  public static getUser = async (email:string):Promise<any> => {
    const AuthRepository = getManager().getRepository(Auth);
    return  await AuthRepository.findOne({email});
  }

  public static updateToken = async (id, token) => {
    const AuthRepository = getManager().getRepository(Auth);
    return await AuthRepository.update({ id }, { token })
  }

  public static checkIfEmailExists = async (email) => {
    const AuthRepository = getManager().getRepository(Auth);
    return  await AuthRepository.findOne({email});
  }

  public static checkIfTokenExists = async (token)=>{
    const AuthRepository = getManager().getRepository(Auth);
    return  await AuthRepository.findOne({token});
  }

}