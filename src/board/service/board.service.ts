import { CreateBoardDto } from '@board/dto/create.board.dto';
import { Board } from '@board/model/board.enttiy';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  /** 게시글 아이디로 찾기 */
  async findBoardById(boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new HttpException('존재하지 않는 게시글입니다.', 400);
    }
    return board;
  }

  /** 게시글 리스트 조회 */
  async findBoardList(page, limit) {
    const queryBuilder = this.boardRepository.createQueryBuilder('b');

    try {
      const board = await queryBuilder
        .leftJoinAndSelect('b.User', 'user')
        .skip(limit * (page - 1))
        .take(limit)
        .getMany();

      return board;
    } catch (error) {
      console.log('error: ', error);
      throw new InternalServerErrorException();
    }
  }

  /** 게시글 상세 조회 */
  async findBoardDetail(boardId) {
    return await this.findBoardById(boardId);
  }

  /** 게시글 생성 */
  async createBoard(currentUser: Users, body: CreateBoardDto) {
    const { id: userId } = currentUser;

    // TODO: 생각해보기 - 만약 같은 내용의 게시글이 있다면?
    const boardInfo = {
      User: userId,
      ...body,
    };
    const createBoard = plainToInstance(Board, boardInfo);
    const board = await this.boardRepository.save(createBoard);
    return board;
  }
}
