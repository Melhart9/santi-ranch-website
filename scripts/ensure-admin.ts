import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if admin exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@terraverde.mx' }
  });

  if (existingAdmin) {
    console.log('Admin user already exists, updating password...');
    // Update password
    const hashedPassword = await hash('admin123', 12);
    await prisma.user.update({
      where: { email: 'admin@terraverde.mx' },
      data: { password: hashedPassword }
    });
    console.log('Admin password updated successfully');
  } else {
    console.log('Creating admin user...');
    // Create admin user
    const hashedPassword = await hash('admin123', 12);
    await prisma.user.create({
      data: {
        email: 'admin@terraverde.mx',
        name: 'Administrador',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('Admin user created successfully');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
