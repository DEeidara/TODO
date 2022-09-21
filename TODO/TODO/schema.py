# from graphene import ObjectType, Mutation
# import graphene
# from graphene_django import DjangoObjectType
# from mainapp.models import Project, TODONotes
# from usersapp.models import TODOUser
#
#
# class TODOUserType(DjangoObjectType):
#     class Meta:
#         model = TODOUser
#         fields = "__all__"
#
#
# class ProjectType(DjangoObjectType):
#     class Meta:
#         model = Project
#         fields = "__all__"
#
#
# class TODOType(DjangoObjectType):
#     class Meta:
#         model = TODONotes
#         fields = "__all__"
#
#
# class Query(ObjectType):
#     all_users = graphene.List(TODOUserType)
#     user_by_id = graphene.List(TODOUserType, id=graphene.Int())
#     projects_by_user_name = graphene.List(ProjectType, username=graphene.String())
#
#     def resolve_user_by_id(self, info, id=None):  # noqa
#         if id:
#             return TODOUser.objects.filter(id=id)
#         return TODOUser.objects.all()
#
#     def resolve_projects_by_user_name(self, info, username=None):  # noqa
#         if username:
#             return Project.objects.filter(devs_list__username=username)
#         return Project.objects.all()
#
#     def resolve_all_users(self, info):  # noqa
#         return TODOUser.objects.all()
#
#
# class TODOUserUpdateMutation(Mutation):
#     class Arguments:
#         username = graphene.String(required=True)
#         first_name = graphene.String(required=True)
#         last_name = graphene.String(required=True)
#         email = graphene.String(required=True)
#         id = graphene.ID()
#
#     user = graphene.Field(TODOUserType)
#
#     @classmethod
#     def mutate(cls, root, info, **kwargs):  # noqa
#         user = TODOUser.objects.get(id=kwargs.get("id"))
#         user.first_name = kwargs.get("first_name")
#         user.username = kwargs.get("username")
#         user.last_name = kwargs.get("last_name")
#         user.email = kwargs.get("email")
#         user.save()
#         return cls(user=user)  # noqa
#
#
# class TODOUserCreateMutation(Mutation):
#     class Arguments:
#         username = graphene.String(required=True)
#         first_name = graphene.String(required=True)
#         last_name = graphene.String(required=True)
#         email = graphene.String()
#
#     user = graphene.Field(TODOUserType)
#
#     @classmethod
#     def mutate(cls, root, info, **kwargs):  # noqa
#         user = TODOUser.objects.create(**kwargs)
#         return cls(user=user)  # noqa
#
#
# class TODOUserDeleteMutation(Mutation):
#     class Arguments:
#         id = graphene.ID()
#
#     users = graphene.List(TODOUserType)
#
#     @classmethod
#     def mutate(cls, root, info, **kwargs):  # noqa
#         TODOUser.objects.get(id=kwargs.get("id")).delete()
#         return cls(users=TODOUser.objects.all())  # noqa
#
#
# class Mutations(ObjectType):
#     create_user = TODOUserCreateMutation.Field()
#     update_user = TODOUserUpdateMutation.Field()
#     delete_user = TODOUserDeleteMutation.Field()
#
#
# schema = graphene.Schema(query=Query, mutation=Mutations)
