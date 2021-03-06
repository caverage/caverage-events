"""Modify LoginLink

Revision ID: 1ede389cf74f
Revises: ee552bd361f7
Create Date: 2020-09-25 15:54:10.000976

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '1ede389cf74f'
down_revision = 'ee552bd361f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('loginlink',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('code', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('expires_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_loginlink_code'), 'loginlink', ['code'], unique=True)
    op.create_index(op.f('ix_loginlink_id'), 'loginlink', ['id'], unique=False)
    op.create_index(op.f('ix_loginlink_user_id'), 'loginlink', ['user_id'], unique=False)
    op.drop_index('ix_login_link_code', table_name='login_link')
    op.drop_index('ix_login_link_id', table_name='login_link')
    op.drop_index('ix_login_link_user_id', table_name='login_link')
    op.drop_table('login_link')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('login_link',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('code', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('active', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('expires_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='login_link_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='login_link_pkey')
    )
    op.create_index('ix_login_link_user_id', 'login_link', ['user_id'], unique=False)
    op.create_index('ix_login_link_id', 'login_link', ['id'], unique=False)
    op.create_index('ix_login_link_code', 'login_link', ['code'], unique=True)
    op.drop_index(op.f('ix_loginlink_user_id'), table_name='loginlink')
    op.drop_index(op.f('ix_loginlink_id'), table_name='loginlink')
    op.drop_index(op.f('ix_loginlink_code'), table_name='loginlink')
    op.drop_table('loginlink')
    # ### end Alembic commands ###
