"""Added sent to invites

Revision ID: de7a914273f6
Revises: 93e37d267cfc
Create Date: 2020-10-04 19:55:37.456858

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'de7a914273f6'
down_revision = '93e37d267cfc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('invite', sa.Column('sent', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('invite', 'sent')
    # ### end Alembic commands ###
