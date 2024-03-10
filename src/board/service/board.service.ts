import { CreateBoardDto } from '@board/dto/create.board.dto';
import { UpdateBoardDto } from '@board/dto/update.board.dto';
import { Board } from '@board/model/board.enttiy';
import { Like } from '@like/model/like.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  /** 게시글 아이디로 찾기 */
  async findBoardById(boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    return board;
  }

  /** 게시글 유저 찾기 */
  async findBoardByUser(userId: number, boardId: number) {
    const board = await this.boardRepository.findOne({
      relations: ['User'],
      where: { id: boardId, User: { id: userId } },
    });

    if (!board) {
      throw new NotFoundException('해당 게시글의 작성자가 아닙니다.');
    }
    return board;
  }

  /** 게시글의 좋아요 개수 조회 */
  async countLikesForBoard(boardId: number) {
    const queryBuilder = this.likeRepository.createQueryBuilder('like');

    const countLikes = await queryBuilder
      .where('like.board_id = :boardId', { boardId })
      .getCount();

    return countLikes;
  }

  /** 좋아요 상태 조회 */
  async isLikesForBoard(userId: number, boardId: number) {
    const queryBuilder = this.likeRepository.createQueryBuilder('like');

    const isLike = await queryBuilder
      .where('like.user_id = :userId', { userId })
      .andWhere('like.board_id = :boardId', { boardId })
      .getOne();

    return !!isLike;
  }

  /** 게시글 리스트 조회 */
  async findBoardList(cursor, limit) {
    const queryBuilder = this.boardRepository.createQueryBuilder('b');

    try {
      const board = await queryBuilder
        .leftJoinAndSelect('b.User', 'user')
        .loadRelationCountAndMap('b.likes_count', 'b.Like')
        .loadRelationCountAndMap('b.comment_count', 'b.Comment')
        .orderBy('b.id', 'ASC')
        .take(limit + 1)
        .where(cursor ? 'b.id > :cursor' : '0=0', { cursor })
        .getMany();

      let hasNextPage = false;
      if (board.length > limit) {
        hasNextPage = true;
        board.pop();
      }

      return {
        data: board,
        hasNextPage,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /** 게시글 상세 조회 */
  async findBoardDetail(currentUser, boardId) {
    const { id: userId } = currentUser;

    // 게시글 상세 조회
    const board = await this.findBoardById(boardId);
    // 게시글 좋아요 개수
    const likeCount = await this.countLikesForBoard(boardId);
    // 게시글 좋아요 여부
    const isLike = await this.isLikesForBoard(userId, boardId);

    return {
      ...board,
      like_count: likeCount,
      is_like: isLike,
    };
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

  /** 게시글 수정 */
  async updateBoard(currentUser: Users, body: UpdateBoardDto, boardId: number) {
    const { id: userId } = currentUser;

    const boardInfo = {
      User: userId,
      ...body,
    };

    const updateBoard = plainToInstance(Board, boardInfo);
    await this.boardRepository.update({ id: boardId }, updateBoard);
    return await this.findBoardById(boardId);
  }

  /** 게시글 삭제 */
  async deleteBoard(boardId: number) {
    await this.boardRepository.delete({ id: boardId });

    return true;
  }
}
