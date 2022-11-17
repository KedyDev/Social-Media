import { Injectable } from '@nestjs/common';
import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService:PrismaService ) {}

    // create user new post 
    createPost(user: IUserInfo,data:PostDto) {
        const userData = this.prismaService.post.create({
            data: {
                content: data.content,
                title: data.title,
                authorId: user.id,
            },
        });
        // return new post data
        return userData;
    }

    // update user post
    updatePost(id:number,data:PostDto,user: IUserInfo) {
        const userPosts = this.prismaService.user.findFirst({
            where: {
                id: user.id,
            },
            select: {
                posts: {
                    where: {
                        id: id,
                    },
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        // check if user has post with id
        if (userPosts) {
            const updatedPost = this.prismaService.post.update({
                where: {
                    id: id,
                },
                data: {
                    title: data.title,
                    content: data.content,
                },
            });
            // return updated post data
            return updatedPost;
        }


}}
