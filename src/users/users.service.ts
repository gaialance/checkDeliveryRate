/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Not,
  Equal,
  Between,
  ILike,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entities';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';
import { Status } from './enums/status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Check if same email exist
    const existEmail = await this.findOneByEmail(createUserDto.email);
    if (existEmail) {
      throw new UnprocessableEntityException('email exist');
    }

    // Check if same username exist
    const existUsername = await this.findOneByUsername(createUserDto.username);
    if (existUsername) {
      throw new UnprocessableEntityException('userName exist');
    }

    return this.usersRepository
      .save(
        this.usersRepository.create({
          ...createUserDto,
        }),
      )
      .then((record) => {
        return record;
      });
  }

  async findAll(query) {
    const page: number = query.page || 1;
    const perPage: number = query.perPage || 10;
    const skip: number = (page - 1) * perPage;
    const orderName = query.order?.name || 'id';
    const orderDir = query.order?.direction || 'DESC';

    const queries: any = {};
    const searchUuid: string = query.search?.uuid;
    const searchEmail: string = query.search?.email;
    const searchName: string = query.search?.name;
    const searchUsername: string = query.search?.username;
    const searchUserType: string = query.search?.userType;
    const searchStartCreatedAt: number = query.search?.startCreatedAt;
    const searchEndCreatedAt: number = query.search?.endCreatedAt;
    const searchStatus: Status = query.search?.status;

    if (searchUuid) {
      queries['uuid'] = Like('%' + searchUuid + '%');
    }

    if (searchEmail) {
      queries['email'] = ILike('%' + searchEmail + '%');
    }

    if (searchName) {
      queries['name'] = ILike('%' + searchName + '%');
    }

    if (searchUsername) {
      queries['username'] = ILike('%' + searchUsername + '%');
    }

    if (searchUserType) {
      queries['userType'] = Equal(searchUserType);
    }

    if (searchStartCreatedAt) {
      const date = DateTime.fromSeconds(+searchStartCreatedAt);

      queries['createdAt'] = MoreThanOrEqual(date.toSQL());
    }

    if (searchEndCreatedAt) {
      const date = DateTime.fromSeconds(+searchEndCreatedAt);

      queries['createdAt'] = LessThanOrEqual(date.toSQL());
    }

    if (searchStartCreatedAt && searchEndCreatedAt) {
      const startDate = DateTime.fromSeconds(+searchStartCreatedAt);
      const endDate = DateTime.fromSeconds(+searchEndCreatedAt);

      queries['createdAt'] = Between(startDate.toSQL(), endDate.toSQL());
    }

    if (searchStatus) {
      queries['status'] = Equal(searchStatus);
    }

    return this.usersRepository
      .findAndCount({
        where: {
          ...queries,
        },
        order: { [orderName]: orderDir },
        take: perPage,
        skip: skip,
      })
      .then((result) => {
        return {
          data: result[0],
          meta: {
            total: result[1],
            perPage: +perPage,
            currentPage: +page,
            last_page: Math.ceil(result[1] / perPage),
            first_page: 1,
          },
        };
      });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id: Equal(id) } });
  }

  findOneIncludeRefreshToken(id: number) {
    return this.usersRepository.findOne({
      where: { id: Equal(id) },
      select: ['id', 'refreshToken', 'status'],
    });
  }

  findOneOrFail(id: number) {
    return this.findOne(id).then((result) => {
      if (!result) {
        throw new NotFoundException('User not found');
      }
      return result;
    });
  }

  findOneByUuid(uuid: string, merchantId?: number, merchantOutletId?: number) {
    const queries = {
      uuid: Equal(uuid),
    };

    return this.usersRepository.findOne({
      where: {
        ...queries,
      },
    });
  }

  findOneByUuidOrFail(uuid: string) {
    return this.findOneByUuid(uuid).then((result) => {
      if (!result) {
        throw new NotFoundException('User not found');
      }
      return result;
    });
  }

  findOneByEmailOrUsernameIncludePassword(emailOrUsername: string) {
    return this.usersRepository.findOne({
      where: [
        { email: Equal(emailOrUsername) },
        { username: Equal(emailOrUsername) },
      ],
      select: ['id', 'email', 'username', 'password', 'userType', 'status'],
    });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username: Equal(username) },
    });
  }

  findOneByUsernameIgnoreSelf(id: number, username: string) {
    return this.usersRepository.findOne({
      where: { username: Equal(username), id: Not(id) },
    });
  }

  findOneByEmailOrUsername(emailOrUsername: string) {
    return this.usersRepository.findOne({
      where: [
        { email: Equal(emailOrUsername) },
        { username: Equal(emailOrUsername) },
      ],
    });
  }

  findOneByEmailOrUsernameOrFail(emailOrUsername: string) {
    return this.findOneByEmailOrUsername(emailOrUsername).then((result) => {
      if (!result) {
        throw new NotFoundException('User not found');
      }
      return result;
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email: Equal(email) },
    });
  }

  findOneByEmailIgnoreSelf(id: number, email: string) {
    return this.usersRepository.findOne({
      where: { email: Equal(email), id: Not(id) },
    });
  }

  findOneByEmailOrFail(email: string) {
    return this.findOneByEmail(email).then((result) => {
      if (!result) {
        throw new NotFoundException('User not found');
      }
      return result;
    });
  }

  updateByUuid(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ) {
    return this.findOneByUuidOrFail(uuid).then(
      (user) => {
        return this.update(user.id, updateUserDto);
      },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {...newUpdateDto  } = updateUserDto;
    // Check if same email exist
    if (updateUserDto.email) {
      const existEmail = await this.findOneByEmailIgnoreSelf(
        +id,
        updateUserDto.email,
      );
      if (existEmail) {
        throw new UnprocessableEntityException('Email exist');
      }
    }

    // Check if same username exist
    if (updateUserDto.username) {
      const existUsername = await this.findOneByUsernameIgnoreSelf(
        +id,
        updateUserDto.username,
      );
      if (existUsername) {
        throw new UnprocessableEntityException('User exist');
      }
    }

    // Need to update password here instead of entity bcoz @BeforeUpdate only will work if use repo.save()
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      newUpdateDto["password"] = await bcrypt.hash(
        updateUserDto.password,
        salt,
      );
    }

    return this.usersRepository.update({ id: id }, newUpdateDto).then(() => {
      return this.findOneOrFail(id).then((record) => {

        return record;
      });
    });
  }

}
