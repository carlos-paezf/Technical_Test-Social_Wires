import { BaseService } from "../config"
import { PostDTO } from "../dtos/post.dto"
import { PostEntity } from "../entities"


export class PostService extends BaseService<PostEntity> {
    constructor () {
        super( PostEntity )
    }

    public async findAllPosts (
        { title, createdAt }: { title?: string, createdAt: Date }
    ): Promise<[ PostEntity[], number ]> {
        return ( await this.execRepository )
            .createQueryBuilder( 'post' )
            .select()
            .where( 'post.title ILIKE :title', { title: `%${ new RegExp( `${ title }` ) }%` } )
            .andWhere( 'post.createdAt >= :createdAt', { createdAt: new Date( createdAt ) } )
            .getManyAndCount()
    }

    /**
     * It takes a PostDTO object, saves it to the database, and returns a PostEntity object
     * @param {PostDTO} body - PostDTO
     * @returns The PostEntity object
     */
    public async createPost ( body: PostDTO ): Promise<PostEntity> {
        return ( await this.execRepository ).save( body )
    }
}