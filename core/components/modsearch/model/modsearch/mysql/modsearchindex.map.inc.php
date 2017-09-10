<?php
$xpdo_meta_map['modSearchIndex']= array (
  'package' => 'modSearch',
  'version' => '1.1',
  'table' => 'modsearch_indexes',
  'extends' => 'xPDOObject',
  'fields' => 
  array (
    'resource_id' => NULL,
    'lemma' => NULL,
  ),
  'fieldMeta' => 
  array (
    'resource_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'index' => 'pk',
    ),
    'lemma' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'index' => 'pk',
    ),
  ),
  'indexes' => 
  array (
    'PRIMARY' => 
    array (
      'alias' => 'PRIMARY',
      'primary' => true,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'resource_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'lemma' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => array(
    'Resource' => 
        array (
            'class' => 'modResource',
            'local' => 'resource_id',
            'foreign' => 'id',
            'cardinality' => 'one',
            'owner' => 'foreign', 
        ),
  ),
);
