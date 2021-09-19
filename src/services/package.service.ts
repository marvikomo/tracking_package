import { getConnection, getConnectionManager, getRepository, getManager } from 'typeorm';
import { Package } from '../entity/Package';
import { PackageDto } from '../dto/package.dto';

export class PackageService {

  public static create = async (post: PackageDto):Promise<Package> => {
    const packageRepository = getManager().getRepository(Package);
    let newPost = await packageRepository.save(post);

    return newPost;
   
  } 

  public static find = async (data) => {
    const packageRepository = getManager().getRepository(Package);
      return await packageRepository.find(data);
  }

  public static updatePackageStatus = async (id, status)=>{
    const packageRepository = getManager().getRepository(Package);
    return await packageRepository.update({ id }, { status })
    
  }

  public static getPackageStatus = async (tracking_id)=>{
    const packageRepository = getManager().getRepository(Package);
    return await packageRepository.find({tracking_id})
  }
}