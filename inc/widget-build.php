<?php

/**
 * Register the widget
 */
function REGISTER_UMF_PRODUCT_DATA_WIDGET() {
    register_widget( 'UMF_PRODUCT_DATA_WIDGET' );
}
add_action( 'widgets_init', 'REGISTER_UMF_PRODUCT_DATA_WIDGET' );

/**
 * Class UMF_PRODUCT_DATA_WIDGET
 */
class UMF_PRODUCT_DATA_WIDGET extends WP_Widget
{
    /** Basic Widget Settings */
    const WIDGET_NAME        = "UMF_PRODUCT_DATA";
    const WIDGET_DESCRIPTION = "UMF_PRODUCT_DATA";
    public $textdomain;
    public $fields;
    /**
     * Construct the widget
     */
    public function __construct()
    {
        //We're going to use $this->textdomain as both the translation domain and the widget class name and ID
        $this->textdomain = strtolower(get_class($this));

        //Figure out your textdomain for translations via this handy debug print
        //var_dump($this->textdomain);

        //Add fields
        $this->add_field('title', 'Enter title', '', 'text');
        $this->add_field('product_category', 'Product Category (slug)', '', 'text');

        //Translations
        //load_plugin_textdomain($this->textdomain, false, basename(dirname(__FILE__)) . '/languages' );

        //Init the widget
        parent::__construct($this->textdomain, __(self::WIDGET_NAME, $this->textdomain), array('description' => __(self::WIDGET_DESCRIPTION, $this->textdomain), 'classname' => $this->textdomain));
    }
    /**
     * Widget frontend
     *
     * @param array $args
     * @param array $instance
     */
    public function widget($args, $instance)
    {

        $this->plugin_enqueue();

        $title = apply_filters('widget_title', $instance['title']);
        /* Before and after widget arguments are usually modified by themes */
        echo $args['before_widget'];
        if (!empty($title)) {
            echo $args['before_title'] . $title . $args['after_title'];
        }

        /* Widget output here */
        $this->widget_output($args, $instance);
        /* After widget */
        echo $args['after_widget'];
    }

    /**
     * This function will execute the widget frontend logic.
     * Everything you want in the widget should be output here.
     */
    private function widget_output($args, $instance)
    {
        extract($instance);
        /**
         * This is where you write your custom code.
         */

        include sprintf("%s/../template/build.php", dirname(__FILE__));

    }

    public function plugin_enqueue()
    {

      wp_enqueue_style(
          'umf-product-data',
          plugins_url('css/umf-product-data.min.css', dirname(__FILE__)),
          array(),
          UMF_PRODUCT_DATA_VERSION,
        );

        wp_enqueue_script(
            'UMF_PRODUCT_DATA_widget',
            plugins_url('js/umf-product-data.min.js', dirname(__FILE__)),
            array('jquery'),
            UMF_PRODUCT_DATA_VERSION,
            true
        );
        wp_enqueue_script(
            'fontawesome',
            'https://kit.fontawesome.com/506c040f6b.js',
            array(),
            '5.15.4 ',
            true
        );

        wp_enqueue_script(
            'UMF_PRODUCT_DATA_BUILD',
            plugins_url('js/build.js', dirname(__FILE__)),
            array('jquery'),
            UMF_PRODUCT_DATA_VERSION,
            true
        );

    }
    /**
     * Widget backend
     *
     * @param array $instance
     * @return string|void
     */
    public function form($instance)
    {

        echo '<p>' . self::WIDGET_DESCRIPTION . '</p>';

        /* Generate admin for fields */
        foreach ($this->fields as $field_name => $field_data) {
            if ($field_data['type'] === 'text'):
            ?>
        <p>
          <label for="<?php echo $this->get_field_id($field_name); ?>"><?php _e($field_data['description'], $this->textdomain);?></label>
          <input class="widefat" id="<?php echo $this->get_field_id($field_name); ?>" name="<?php echo $this->get_field_name($field_name); ?>" type="text" value="<?php echo esc_attr(isset($instance[$field_name]) ? $instance[$field_name] : $field_data['default_value']); ?>" />
        </p>
      <?php
//elseif($field_data['type'] == 'textarea'):
            //You can implement more field types like this.
            else:
                echo __('Error - Field type not supported', $this->textdomain) . ': ' . $field_data['type'];
            endif;
        }
    }
    /**
     * Adds a text field to the widget
     *
     * @param $field_name
     * @param string $field_description
     * @param string $field_default_value
     * @param string $field_type
     */
    private function add_field($field_name, $field_description = '', $field_default_value = '', $field_type = 'text')
    {
        if (!is_array($this->fields)) {
            $this->fields = array();
        }

        $this->fields[$field_name] = array(
            'name'          => $field_name,
            'description'   => $field_description,
            'default_value' => $field_default_value,
            'type'          => $field_type,
        );
    }
    /**
     * Updating widget by replacing the old instance with new
     *
     * @param array $new_instance
     * @param array $old_instance
     * @return array
     */
    public function update($new_instance, $old_instance)
    {
        return $new_instance;
    }
}
