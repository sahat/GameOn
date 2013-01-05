# $PROJECTDIR/autotest.rb
watch('.*') { |match_data_object| system('jasmine-node . --verbose --color') }
