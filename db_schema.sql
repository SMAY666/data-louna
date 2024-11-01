PGDMP  #    5            
    |            louna    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    louna    DATABASE     y   CREATE DATABASE louna WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE louna;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16619    items    TABLE     �   CREATE TABLE public.items (
    id integer NOT NULL,
    market_hash_name character varying(255) NOT NULL,
    tradable real,
    min_price real
);
    DROP TABLE public.items;
       public         heap    postgres    false    4            �            1259    16617    items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.items_id_seq;
       public          postgres    false    217    4                        0    0    items_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;
          public          postgres    false    215            �            1259    16634 	   purchases    TABLE     �   CREATE TABLE public.purchases (
    id integer NOT NULL,
    "userId" bigint NOT NULL,
    "itemId" bigint NOT NULL,
    price real NOT NULL,
    date timestamp without time zone NOT NULL
);
    DROP TABLE public.purchases;
       public         heap    postgres    false    4            �            1259    16633    purchases_id_seq    SEQUENCE     �   CREATE SEQUENCE public.purchases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.purchases_id_seq;
       public          postgres    false    220    4                       0    0    purchases_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.purchases_id_seq OWNED BY public.purchases.id;
          public          postgres    false    219            �            1259    16623    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    "passwordHash" character varying(255) NOT NULL,
    balance real NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16618    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218    4                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            [           2604    16622    items id    DEFAULT     d   ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
 7   ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    217    217            ]           2604    16637    purchases id    DEFAULT     l   ALTER TABLE ONLY public.purchases ALTER COLUMN id SET DEFAULT nextval('public.purchases_id_seq'::regclass);
 ;   ALTER TABLE public.purchases ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            \           2604    16627    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    218    218            �          0    16619    items 
   TABLE DATA           J   COPY public.items (id, market_hash_name, tradable, min_price) FROM stdin;
    public          postgres    false    217   �       �          0    16634 	   purchases 
   TABLE DATA           H   COPY public.purchases (id, "userId", "itemId", price, date) FROM stdin;
    public          postgres    false    220   �       �          0    16623    users 
   TABLE DATA           F   COPY public.users (id, username, "passwordHash", balance) FROM stdin;
    public          postgres    false    218   �                  0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 40, true);
          public          postgres    false    215                       0    0    purchases_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.purchases_id_seq', 5, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    216            _           2606    16628    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    217            c           2606    16639    purchases purchases_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.purchases DROP CONSTRAINT purchases_pkey;
       public            postgres    false    220            a           2606    16632    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            �   �  x���=o�0�g�Wx�G��>�f�Ҧ(��t1��P�(���Ծ�y��G�k�!������ww����=u_��ː���sN�o�mJ��r裲h�����r~����S],łT�C��a̗�y���C��}�ϗ~*���4i����<���U1F�U�?Nc��}N?w������W'V�9`�s���:�x7 T�Ep.�EYq�=����1O�	l@6��Ķ@�6�J@B�X�f �ٿ�$���?�6@|Y�OL���>z���P]ۄ��p�&2Ub�����4��WA�̵|�Րe�`�K�Ų��)u�㥌��?C�٩y��\��&���FL��5���6�]A�� o���,�Y�iҰl�A�M�F��Di5Q�L,?+���(T�PUq�ݗ/�5�P�l���u}���h-|G �&4      �   P   x�����0�7L��0!�v��?GI�H����d2�)W��C���V I�)歘[A]�l����o�|H�<��/�T      �      x�3�,�M��4426�45�3������ ?E�     