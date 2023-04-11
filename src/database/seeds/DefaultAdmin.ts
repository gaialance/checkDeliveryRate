import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entities';
import { UserType } from '../../users/enums/user-type.enum';
import { Status } from '../../users/enums/status.enum';

export default class DefaultAdminSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);

    await repository
      .findOne({ where: [{ username: 'admin', email: 'admin@admin.com' }] })
      .then(async (user) => {
        if (!user) {
          await repository.save(
            repository.create({
              name: 'Administrator',
              username: 'admin',
              email: 'admin@admin.com',
              password: 'changethis',
              userType: UserType.ADMIN,
              status: Status.ACTIVE
            }),
          );
        }
      });
  }
}
